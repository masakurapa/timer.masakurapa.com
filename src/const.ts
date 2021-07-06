/**
 * デフォルトの背景色
 */
export const DEFAULT_BG_COLOR = {
    RUNNING: '#DDFFFF',
    WARNING: '#FFFFCC',
    DANGER: '#FFDDDD',
    FINISH: '#DDFFDD',
} as const;

/**
 * デフォルトの背景色を切り替える秒数
 */
export const DEFAULT_SWITCH_SECONDS = {
    WARNING: 30,
    DANGER: 10,
} as const;
