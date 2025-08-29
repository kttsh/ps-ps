import { create } from 'zustand';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertMessage {
  id: string; // UUIDやユニークな文字列
  text: string;
}

interface AlertState {
  isAlertVisible: boolean;
  alertType: AlertType;
  messages: AlertMessage[];
  showAlert: (type: AlertType, messages: AlertMessage[]) => void;
  setIsAlertVisible: (visible: boolean) => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  isAlertVisible: false,
  alertType: 'info',
  messages: [],
  showAlert: (type, messages) =>
    set({ isAlertVisible: true, alertType: type, messages }),
  setIsAlertVisible: (visible) => set({ isAlertVisible: visible }),
}));

