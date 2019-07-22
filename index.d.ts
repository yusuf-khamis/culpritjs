declare module 'complete-validator' {

    /**
     * ValidationResults
     *
     * Object returned upon validation
     * Has value and errors properties.
     */
    interface ValidationResults<T> {
        value: T,
        errors?: string[]
    }

    interface ArgsType {
        [name: string]: any;
    }

    /**
     * validate
     *
     * Method that validates the object agains't the schema
     *
     * @param object Object with values to be validated
     * @param schema Object with schema to be used for validation
     * @param extraArgs Extra arguments to be used with the validation
     * @param messages Object with custom messages for the validation errors
     *
     * @return ValidationResults results of the validation with errors and the new object with cleaned values
     */
    function validate<T>(object: any, schema: T, extraArgs?: ArgsType, messages?: ArgsType): ValidationResults<T>;

}
