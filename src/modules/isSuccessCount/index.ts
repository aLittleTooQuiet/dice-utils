export default (mod: string): boolean => !!(mod && /[<>]{1}[\d]{1,}/.test(mod));
