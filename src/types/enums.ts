export enum MESSAGE_TYPE {
	ERROR = 'ERROR',
	WARNING = 'WARNING',
	SUCCESS = 'SUCCESS',
	INFO = 'INFO'
}

export enum ITEM_FLAG {
	TODO = 'TODO',
	IN_PROGRESS = 'IN_PROGRESS',
	CANCELLED = 'CANCELLED',
	DONE = 'DONE'
}

export const MESSAGE_TYPES = Object.values(MESSAGE_TYPE)
export const ITEM_FLAGS = Object.values(ITEM_FLAG)
