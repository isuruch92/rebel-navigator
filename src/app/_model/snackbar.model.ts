export enum SnackBarType {
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
  WARNING = 'WARNING',
}

export interface SnackBarData {
  message: string;
  type: SnackBarType,
  duration?: number;
  actionText?: string;
}
