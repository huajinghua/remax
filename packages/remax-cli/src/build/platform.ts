export const wechat = 'wechat';
export const alipay = 'alipay';
export const toutiao = 'toutiao';
export const h5 = 'h5';
export const mini = [wechat, alipay, toutiao];

export function isMini(target: string) {
  return !!mini.find(t => t === target);
}
