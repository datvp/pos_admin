export const STATUSES = {
  CREATE: 'Create', // pending
  APPROVED: 'Approved', // sending mail and waiting for activating
  DELETE: 'Delete', // Deleted
  UPDATE: 'Update',
  COMPLETED: 'Completed',
  ACCEPTED: 'Accepted',
  CANCEL: 'Cancel',
  REJECTED: 'Rejected',
  INPROGRESS: 'Inprogress',
  READ: 'Read',
  PAYMENT_WAITING_APPROVED: 'PaymentWaitingApproved',
  PAID: 'Paid',
  REJECTED_PAY: 'RejectedPay',
  REVIEWED: 'Reviewed',
  START_SERVICE: 'StartService',
  CANCEL_SERVICE: 'CancelService',
  OVER_SCHEDULE: 'OverSchedule',
  ACTIVE: 'Active',
};

export const STATUS_MESSAGES = {
  [STATUSES.CREATE]: {
    simple: 'Pending',
    detail: 'Pending Artist',
  },
  [STATUSES.ACCEPTED]: {
    simple: 'Accepted',
    detail: 'Artist accepted',
  },
  [STATUSES.REJECTED]: {
    simple: 'Rejected',
    detail: 'Artist rejected',
  },
  [STATUSES.CANCEL]: {
    simple: 'Canceled',
    detail: 'You canceled',
  },
  [STATUSES.PAYMENT_WAITING_APPROVED]: {
    simple: 'Completed',
    detail: 'Completed',
  },
  [STATUSES.INPROGRESS]: {
    simple: 'Inprogress',
    detail: 'Inprogress',
  },
  [STATUSES.PAID]: {
    simple: 'Completed',
    detail: 'Completed',
  },
  [STATUSES.REJECTED_PAY]: {
    simple: 'Completed',
    detail: 'Completed',
  },
  [STATUSES.COMPLETED]: {
    simple: 'Completed',
    detail: 'Completed',
  },
  [STATUSES.REVIEWED]: {
    simple: 'Reviewed',
    detail: 'Completed',
  },
  [STATUSES.CANCEL_SERVICE]: {
    simple: 'Canceled service',
    detail: 'Canceled, Not served',
  },
  [STATUSES.START_SERVICE]: {
    simple: 'Started service',
    detail: 'Artist started services',
  },
  [STATUSES.OVER_SCHEDULE]: {
    simple: 'Over scheduled',
    detail: 'Over scheduled',
  },
};
