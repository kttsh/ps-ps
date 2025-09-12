import { useFgsStore } from '@/stores/useFgsStore';
import { usePipGenerationModeStore } from '@/stores/usePipGenerationModeStore';
import { useSelectedFGStore } from '@/stores/useSelectedFgStore';
import { useSelectedJobNoStore } from '@/stores/useSelectedJobNoStore';
import { useSelectedProjectStore } from '@/stores/useSelectedProjectStore';

/**
 * global stateを初期化
 */
export const resetGrobalState = () => {
	localStorage.removeItem('selectedProject-storage');
	localStorage.removeItem('selectedJobNo-storage');
	localStorage.removeItem('selectedFG-storage');
	localStorage.removeItem('fgs-storage');
	localStorage.removeItem('pipGenerationMode-storage');

	useSelectedProjectStore.getState().setSelectedProject(null);
	useSelectedJobNoStore.getState().setSelectedJobNo('');
	useSelectedFGStore.getState().setSelectedFG(null);
	useFgsStore.getState().setFgs([]);
	usePipGenerationModeStore.getState().setPipGenerationMode('display');
};
