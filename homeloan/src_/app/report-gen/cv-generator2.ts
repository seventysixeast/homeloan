import {
  Document,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  AlignmentType,
  HeadingLevel,
} from 'docx';

export class DocumentCreator2 {
  public create(data: any): Document {
    let dataJson1 = JSON.parse(data.loan_request.dataJson);
    let dataJson2 = JSON.parse(data.risk_one.JsonData);
    let dataJson3 = JSON.parse(data.risk_two.JsonData);
    let dataJson4 = JSON.parse(data.addinfo.JsonData);
    // console.log(dataJson2.mws_total);
    const document = new Document({
      styles: {
        default: {
          heading1: {
            run: {
              size: 24,
              font: 'Calibri (Body)',
            },
            paragraph: {
              spacing: {
                before: 50,
                after: 50,
              },
              indent: {
                left: 50,
                right: 50,
              },
            },
          },
          heading2: {
            run: {
              size: 24,
              font: 'Calibri (Body)',
              color: '1F3864',
            },
            paragraph: {
              alignment: AlignmentType.CENTER,
            },
          },
          heading3: {
            run: {
              size: 24,
              font: 'Calibri (Body)',
              color: '1F3864',
            },
            paragraph: {
              spacing: {
                before: 50,
                after: 50,
              },
              indent: {
                left: 50,
                right: 50,
              },
            },
          },
        },
      },

      sections: [
        {
          children: [
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'NAME OF FINANCIAL INSTITUTION',
                          heading: HeadingLevel.HEADING_2,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'HOME LOAN PROPOSAL NOTE',
                          heading: HeadingLevel.HEADING_2,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Branch',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Branch',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Proposal No',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '123',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '10.12.2022',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Borrower / Guarantor’s Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Borrower Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Father / Husband Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'NRC No.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Age (Years)',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '1st Applicant',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_fName,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_nrc,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_age,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_paddress,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Activity Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '2nd Applicant',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_fname,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_nrc,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_age,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_paddress,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Activity Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Guarantor Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Father / Husband Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'NRC No.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Age (Years)',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '1st Guarantor',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_fName,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_nrc,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_age,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_paddress,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Activity Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '2nd Guarantor',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_fname,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_nrc,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_age,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_paddress,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Activity Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
              ],

              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Project Cost and Loan Request Amount:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purpose',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Value (kyats)',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Details',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'a',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of Flat / Apartment',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[0].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[0].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'b',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of House',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[1].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[1].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'c',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of Land',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[2].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[2].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'd',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Registration Fee / Stamp Duty',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[3].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[3].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'e',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Construction / Additional Construction',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[4].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[4].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'f',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Home Renovation / Upgradation',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[5].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[5].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'g',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Home Furnishing',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[6].cost),
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[6].detail,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Total Cost',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.total,
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Borrowers Margin Contribution (Amt.)',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.appMargin,
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Margin % age:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.marginAge,
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Loan Request Amount',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.loanRequest,
                          heading: HeadingLevel.HEADING_3,
                          alignment: AlignmentType.END,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Property Details:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.propertyD,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments, if any:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.comment,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                  ],
                }),
              ],
              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Visit Details - Applicants and Guarantors:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Name / Designation of Visiting Staff',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                      rowSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.name1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.designation1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date of Visit:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.visitDate1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.name2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.designation2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date of Visit:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.visitDate2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'A. Visit Details - Applicants:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.comment1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 5,
                      rowSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments / Findings:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.comment2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 5,
                      rowSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments / Findings:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'B. Visit Details - Guarantors',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.g_visitDate,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.comment3,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 5,
                      rowSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments / Findings:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_name,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.client_visit.comment4,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 5,
                      rowSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments / Findings:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
              ],
              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Site Visit Details:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Name of Visiting Staff',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                      rowSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.name1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.designation1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date of Visit:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.visitDate1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.name2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.designation2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date of Visit:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.visitDate2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Full Property Details (Such as Location, Ownership etc.)',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                      rowSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.details,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                      rowSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Property Valuation Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                      rowSpan: 5,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Market Value:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.mValue,
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Distress Sale Value:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.dsValue,
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Report Date:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.reportDate,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Valuers Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.valuerName,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments, if any',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.comments1,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Property Legal Search:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                      rowSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Advocate Name:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.advocateName,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Report Date:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.reportDate2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments, if any:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.site_visit.comments2,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
              ],

              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Credit Risk Assessment:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Credit Risk Assessment',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Maximum Score',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Client Score',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'a',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Personal Credential Score:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson2.mws_total),
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '29',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'b',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Credit Credential Score:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson3.mws_total),
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                          
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '33',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'c',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Management Assessment Score:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '20',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '13',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Total Score',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '100',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '75',
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Credit Safety Level',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Good',
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.CENTER,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
              ],

              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicants Net Worth and Repayment Capacity:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Amount of Proposed Monthly Equated Monthly Instalment (EMIs):',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.ammountPEMI,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicants Total Personal Income *',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicants Total Close Family Income *',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Estimated Monthly Income: ( Kyats )',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.EMI1,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.EMI2,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Income / Instalment Ratio:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.IIR1,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.IIR2,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '*In case of joint borrowers, combined Income to be mentioned.',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicants Net Worth:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_name,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_name,
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Combined (Total) Net Worth',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Net Worth',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.netWorth1,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.netWorth2,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.totalNetWorth,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Net Worth / Loan Amount Ratio:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.loanAmountRatio,
                          heading: HeadingLevel.HEADING_3,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
              ],

              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Recommendation:',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'In view of applicants genuine requirement of home loan and their credit safety level as:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 4,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Good ',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: ',',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Kyats:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.addinfo.loanAmmount,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '(',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Eighty Millions only',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: ')',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'On following terms and conditions:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'a.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Rate of Interest @:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.roi,
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '% p.a. compounded on monthly rests.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Penal Interest Rate',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.roia,
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '% p.a. on overdue / default amount.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'b',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Moratorium Conditions:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                      rowSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '>',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.moratorium,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),

                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '>',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Interest charged during moratorium period to be serviced by client on monthly basis.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'c',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Repayment Schedule:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.moratorium,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Equated Monthly Instalments (EMIs) of Kyats',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.EMI,
                          heading: HeadingLevel.HEADING_1,
                          alignment:AlignmentType.END

                        }),
                      ],
                      columnSpan: 1,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Each commencing from',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),

                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.emiStatingMonth,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 6,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'd',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Other Terms, if any:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),

                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson4.terms,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),

                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Property to be insured.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),                
              ],
              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
            new Paragraph({
              children: [new TextRun('')],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'SANCTIONED',
                          heading: HeadingLevel.HEADING_3,
                        }),
                      ],
                      columnSpan: 6,
                      shading: {
                        fill: 'D9E2F3',
                      },
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Designation',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Designation',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Designation',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Date',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                  ],
                }),
              ],
              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            })
              
          ],
        },
      ],
    });

    return document;
  }
}


