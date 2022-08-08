/**
 * Parses a validationRules string, and returns a prepared validation rules
 * array.
 *
 * "accepted|min:5|max:10" =>
 * [
 *   ["accepted"],
 *   ["min", "5"],
 *   ["max", "10"]
 * ]
 *
 * @param validationRules - The validation rules string to parse.
 */
export function prepareValidationRules(validationRulesStr: string): string[][] {
  const validationRules = validationRulesStr?.split('|') ?? [];

  return validationRules
    .filter((methodAndParams: string) => !!methodAndParams)
    .map((methodAndParams: string) => {
      const [method, params] = methodAndParams.split(':');
      // The pattern method parameter can contain a valid "," - don't split
      const paramsArray = (method !== 'pattern') ? params?.split(',') ?? [] : [params];
      return [method, ...paramsArray];
    });
}

/**
 * Prepares the error message for display by replacing placeholders like ${0} and ${...}
 * with the appropriate values.
 *
 * @param errorMessage - The error message to be prepared.
 * @param params - The parameters to be used in the error message.
 * @returns The prepared error message.
 */
export function prepareErrorMessage(errorMessage: string, ...params: any[]): string {
  return errorMessage
    .replace(/\$\{\.\.\.\}/g, (match, index) => params.join(', '))
    .replace(/\$\{(\d+)\}/g, (match, index) => params[index]);
}
