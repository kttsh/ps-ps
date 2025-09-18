import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import type { CollectionView } from '@mescius/wijmo';
import * as wjcCore from '@mescius/wijmo';
import { MSR_API_URL } from '@/config/apiConfig';
import type { MSRHeaderType, MSRAIPDataType } from '../types/milestone';
import { transformToMilestoneData } from '../utils/transformToMilestoneData';
import { useState, useCallback, useMemo } from 'react';

interface MilestoneDataServiceOptions {
  MSRMngCode: string;
  pageSize?: number;
}

interface MilestoneDataState {
  headers: MSRHeaderType[];
  data: MSRAIPDataType[];
  skipNum: number;
  hasMore: boolean;
  isLoadingMore: boolean;
  collectionView: CollectionView | null;
}

// Define types for save data
interface SaveDataPayload {
  milestoneData: MSRAIPDataType[];
  MSRMngCode: string;
}

// Define type for new AIP row
interface NewAIPRow {
  PIPNo: string;
  PIPName: string;
  JobNo: string;
  FG: string;
  AIPNo: string;
  VendorName: string;
  VendorCode?: string;
  CountryCode?: string;
  CountryName?: string;
  BuyerName?: string;
  Status?: string;
  FGName?: string;
  KPinFG?: string;
  Shore?: string;
  Order?: string;
  ReqNo?: string;
}

export class MilestoneDataService {
  private static instance: MilestoneDataService | null = null;

  static getInstance(): MilestoneDataService {
    if (!MilestoneDataService.instance) {
      MilestoneDataService.instance = new MilestoneDataService();
    }
    return MilestoneDataService.instance;
  }

  private constructor() { }

  // Fetch headers
  async fetchHeaders(MSRMngCode: string): Promise<MSRHeaderType[]> {
    const APIUrl = MSR_API_URL.MSRGetHeader.replace('%1', MSRMngCode);
    const response = await fetch(APIUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch headers: ${response.status}`);
    }

    const data = await response.json();
    return data.outJson ?? [];
  }

  // Fetch data with pagination
  async fetchData(MSRMngCode: string, skipNum: number): Promise<MSRAIPDataType[]> {
    const APIUrl = MSR_API_URL.MSRGetAIPData
      .replace('%1', MSRMngCode)
      .replace('%2', skipNum.toString());

    const response = await fetch(APIUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status}`);
    }

    const data = await response.json();
    return data.AIPData ?? [];
  }

  // Save milestone data
  async saveData(data: SaveDataPayload): Promise<void> {
    const response = await fetch(MSR_API_URL.SaveDataAll, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to save data: ${response.status}`);
    }
  }

  // Refresh specific PIP group
  async refreshPIPGroup(MSRMngCode: string, PIPCode: string, currentData: MSRAIPDataType[]): Promise<MSRAIPDataType[]> {
    // Fetch all data to get the latest updates
    const allData = await this.fetchData(MSRMngCode, 0);

    // Filter for the specific PIP group
    const filteredGroup = allData.filter(
      (msrAipDataType: MSRAIPDataType) => msrAipDataType.PIPNo === PIPCode
    );

    if (filteredGroup.length > 0) {
      // Remove old data for this PIP and add new data
      const withoutGroup = currentData.filter((item) => item.PIPNo !== PIPCode);
      return [...withoutGroup, ...filteredGroup];
    }

    return currentData;
  }

  // Create CollectionView from data
  createCollectionView(data: MSRAIPDataType[], currentPosition?: number): CollectionView {
    const milestoneData = transformToMilestoneData(data);

    const cv = new wjcCore.CollectionView(milestoneData, {
      trackChanges: true,
    });

    cv.groupDescriptions.push(
      new wjcCore.PropertyGroupDescription('PIPNo', (pip: MSRAIPDataType) => {
        if (pip.PIPName) {
          return `${pip.PIPNo}　PIPName: ${pip.PIPName}`;
        }
        return pip.PIPNo;
      })
    );

    if (currentPosition !== undefined) {
      cv.currentPosition = currentPosition;
    }

    return cv;
  }
}

// React Hook for using MilestoneDataService
export function useMilestoneDataService({ MSRMngCode, pageSize = 50 }: MilestoneDataServiceOptions) {
  const service = useMemo(() => MilestoneDataService.getInstance(), []);
  const queryClient = useQueryClient();

  // Local state management
  const [state, setState] = useState<MilestoneDataState>({
    headers: [],
    data: [],
    skipNum: 0,
    hasMore: true,
    isLoadingMore: false,
    collectionView: null,
  });

  // Query for headers
  const headersQuery = useQuery({
    queryKey: ['MSRHeader', MSRMngCode],
    queryFn: () => service.fetchHeaders(MSRMngCode),
    enabled: Boolean(MSRMngCode),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Query for initial data
  const dataQuery = useQuery({
    queryKey: ['MSRData', MSRMngCode, 0],
    queryFn: () => service.fetchData(MSRMngCode, 0),
    enabled: Boolean(MSRMngCode),
    staleTime: 30 * 1000, // 30 seconds
  });

  // Load more data
  const loadMoreData = useCallback(async () => {
    if (!MSRMngCode || state.isLoadingMore || !state.hasMore) return;

    setState(prev => ({ ...prev, isLoadingMore: true }));

    try {
      const newData = await service.fetchData(MSRMngCode, state.skipNum + pageSize);

      setState(prev => ({
        ...prev,
        data: [...prev.data, ...newData],
        skipNum: prev.skipNum + pageSize,
        hasMore: newData.length > 0,
        isLoadingMore: false,
      }));
    } catch (error) {
      setState(prev => ({ ...prev, isLoadingMore: false }));
      throw error;
    }
  }, [MSRMngCode, state.skipNum, state.isLoadingMore, state.hasMore, pageSize, service]);

  // Refresh specific PIP group
  const refreshPIPGroup = useCallback(async (PIPCode: string) => {
    if (!MSRMngCode) return;

    try {
      const updatedData = await service.refreshPIPGroup(MSRMngCode, PIPCode, state.data);
      setState(prev => ({ ...prev, data: updatedData }));
    } catch (error) {
      console.error('Failed to refresh PIP group:', error);
      throw error;
    }
  }, [MSRMngCode, state.data, service]);

  // Update collection view when data changes
  const updateCollectionView = useCallback((data: MSRAIPDataType[]) => {
    setState(prev => {
      const currentPosition = prev.collectionView?.currentPosition;
      const cv = service.createCollectionView(data, currentPosition);
      return { ...prev, collectionView: cv };
    });
  }, [service]);

  // Save mutation
  const saveMutation = useMutation({
    mutationFn: (data: SaveDataPayload) => service.saveData(data),
    onSuccess: () => {
      // Invalidate queries to refresh data
      queryClient.invalidateQueries({ queryKey: ['MSRData', MSRMngCode] });
    },
  });

  // Update state when queries succeed
  if (headersQuery.isSuccess && state.headers.length === 0) {
    setState(prev => ({ ...prev, headers: headersQuery.data }));
  }

  if (dataQuery.isSuccess && state.data.length === 0) {
    setState(prev => ({ ...prev, data: dataQuery.data }));
  }

  // Add new AIP rows to existing data
  const addAIPRows = useCallback((pipCode: string, newRows: NewAIPRow[]) => {
    setState(prevState => {
      const updatedData = [...prevState.data];

      // Find the target PIP
      const targetIndex = updatedData.findIndex(item => item.PIPNo === pipCode);
      if (targetIndex === -1) return prevState;

      const target = { ...updatedData[targetIndex] };

      // Add new AIP entries
      newRows.forEach(row => {
        const alreadyExists = target.AIP.some(aip => aip.AIPNo === row.AIPNo);
        if (!alreadyExists) {
          target.AIP = [...target.AIP, {
            AIPNo: row.AIPNo,
            VendorName: row.VendorName,
            VendorCode: row.VendorCode || '',
            CountryCode: row.CountryCode || '',
            CountryName: row.CountryName || '',
            BuyerName: row.BuyerName || '',
            Status: row.Status || '',
            FGName: row.FGName || '',
            KPinFG: row.KPinFG || '',
            Shore: row.Shore || '',
            Order: row.Order || '',
            ReqNo: row.ReqNo || '',
            Deliverable: [],
            TaskTracking: [],
          }];
        }
      });

      updatedData[targetIndex] = target;
      return { ...prevState, data: updatedData };
    });
  }, []);

  return {
    // State
    headers: state.headers,
    data: state.data,
    collectionView: state.collectionView,

    // Loading states
    isLoadingHeaders: headersQuery.isLoading,
    isLoadingData: dataQuery.isLoading && state.skipNum === 0,
    isLoadingMore: state.isLoadingMore,
    isSaving: saveMutation.isPending,

    // Error states
    headersError: headersQuery.error,
    dataError: dataQuery.error,
    saveError: saveMutation.error,

    // Actions
    loadMoreData,
    refreshPIPGroup,
    updateCollectionView,
    saveData: saveMutation.mutate,
    addAIPRows,

    // Utilities
    hasMore: state.hasMore,
    refetch: () => {
      headersQuery.refetch();
      dataQuery.refetch();
    },
  };
}