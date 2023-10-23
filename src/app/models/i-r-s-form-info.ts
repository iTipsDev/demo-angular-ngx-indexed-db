// Information about IRS forms
// See https://www.irs.gov/forms-instructions-and-publications

export class IRSFormInfo {

  constructor(

    public id?: number,

    public productNumber?: string,

    public fileName?: string,

    public title?: string,

    public revisionDate?: string,

    public taxYear?: string,

    public postedDate?: string,

    public docType?: string,

    public number?: string,

    public pageCount?: number,

    public isDraft?: boolean

  ) {


  }

}
