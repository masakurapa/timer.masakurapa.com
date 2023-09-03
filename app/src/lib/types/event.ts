/**
 * on:xxxでの入力イベント
 */
export type InputEvent = Event & {
    currentTarget: EventTarget & HTMLInputElement;
}
