export interface ICompanyInfo {
    id?: number;
    contactLine1?: string;
    contactLine2?: string;
    phoneNumber?: string;
}

export class CompanyInfo implements ICompanyInfo {
    constructor(public id?: number, public contactLine1?: string, public contactLine2?: string, public phoneNumber?: string) {}
}
