import { TManagedForm } from "../types/globals";
type httpResponse<T> = {
    statusCode: number;
    statusMesage: string;
    data: T;
};
export declare const fetchManagedForms: () => Promise<httpResponse<TManagedForm[]>>;
export declare const fetchManagedForm: (id: string) => Promise<httpResponse<TManagedForm>>;
export declare const saveManagedForm: (managedForm: TManagedForm) => Promise<httpResponse<TManagedForm>>;
export declare const deleteManagedForm: (id: string) => Promise<httpResponse<TManagedForm[]>>;
export {};
