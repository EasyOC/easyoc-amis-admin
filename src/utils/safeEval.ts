export const safeEval = (script: string): any => {
    return Function('"use strict";return (' + script + ")")()
}