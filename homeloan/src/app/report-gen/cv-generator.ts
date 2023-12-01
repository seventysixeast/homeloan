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
  ImageRun
} from 'docx';


export class DocumentCreator {

  async getBlob(){
    const blo = await fetch(
        "https://raw.githubusercontent.com/dolanmiu/docx/master/demo/images/cat.jpg"
      ).then(r => r.blob());
  }

   fetchBlobApi(data:any){
    let dataOfapp = (data.app_data);
     return new Promise(async (resolve,reject)=>{
      const blob = await fetch(
        data.mediaUrl + dataOfapp.a1_photo
      ).then(r => 
        resolve(r.blob())
      ); 
    })
  }
  
  public create(data: any): Document {
    console.log('data',data)
    let dataJson1 = JSON.parse(data.loan_request.dataJson);
    let dataOfBank = JSON.parse(data.addinfo.JsonData);
    let dataOfapp = (data.app_data);
    console.log('dataOfapp' ,dataOfapp)
    // let data
    // let blob = await this.getBlob()

    // console.log('blob',blob)
    // let blob =  this.fetchBlobApi(data);
    // console.log('blob======',blob)
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
                          text: 'MODERN NATIONAL BANK LTD',
                          heading: HeadingLevel.HEADING_2,
                        }),
                      ],
                      columnSpan: 4,
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
                          text: 'APPLICATION FOR HOME LOAN',
                          heading: HeadingLevel.HEADING_2,
                        }),
                      ],
                      columnSpan: 4,
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
                      columnSpan: 4,
                    }),
                  ],
                }),

                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'The Manager / Branch Head',
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
                          text: 'Bank',
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
                          text: dataOfBank.bankName,
                          heading: HeadingLevel.HEADING_1
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: "",
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
                          text: 'I / We request for Home Loan of Kyats:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '(Amount in figures)',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.loanRequest,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                  ],
                }),
                // new TableRow({
                //   children: [
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           text: '',
                //           heading: HeadingLevel.HEADING_1,
                //         }),
                //       ],
                //       columnSpan: 2,
                //     }),
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           text: '(Amount in words)',
                //           heading: HeadingLevel.HEADING_1,
                //         }),
                //       ],
                //     }),
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           text: data.loan_request.loanRequest,
                //           heading: HeadingLevel.HEADING_1,
                //         }),
                //       ],
                //     }),
                //   ],
                // }),
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
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      shading: {
                        fill: 'D9E2F3',
                      },
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
                      columnSpan: 4,
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
                          text: 'Purpose ',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Value / Cost',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Details',
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
                          text: 'a',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of Flat / Apartment',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[0].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[0].detail,
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
                          text: 'b',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of House',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[1].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[1].detail,
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
                          text: 'c',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Purchase of Land ',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[2].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[2].detail,
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
                          text: 'd',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Registration Fee / Stamp Duty',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[3].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[3].detail,
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
                          text: 'e',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Construction / Additional Construction',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[4].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[0].detail,
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
                          text: 'f',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Home Renovation / Upgradation',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[5].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[5].detail,
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
                          text: 'g',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Home Furnishing',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: JSON.stringify(dataJson1[6].cost),
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: dataJson1[6].detail,
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Total Cost',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.total,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Margin % age.',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.marginAge,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Loan Request Amount',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.loanRequest,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Total Cost',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.total,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Property Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.propertyD,
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Comments, if any',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.loan_request.comment,
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
                          text: 'Applicant’s Income Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      shading: {
                        fill: 'D9E2F3',
                      },
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
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicant’s Total Personal Income *',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicant’s Total Family Income **',
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
                          text: 'Estimated Monthly Income: (Kyats)',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 2,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.EMI1,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.net_worth.EMI2,
                          heading: HeadingLevel.HEADING_1,
                          alignment: AlignmentType.END,
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
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '*In case of Joint Applicants, mention total estimated monthly income of applicants.',
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
                          text: '**Total Monthly Family Income including income of close family members i.e., Parents, Spouse, Brothers and Sisters etc.',
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
                          text: 'Guarantor Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      shading: {
                        fill: 'D9E2F3',
                      },
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'I / We offer personal guarantee of following persons:',
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
                          text: 'Name',
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
                          text: 'NRC No',
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
                          text: '1st Guarantor’s Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
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
                          text: 'Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_paddress,
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
                          text: 'Activity:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a1_activity,
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
                          text: '2nd Guarantor’s Name',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
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
                          text: 'Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_paddress,
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
                          text: 'Activity:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.guar_data.a2_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 3,
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
                          text: 'Applicant’s Declaration:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      shading: {
                        fill: 'D9E2F3',
                      },
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'I / We declare and undertake that I / We shall use the loan funds solely for the purpose of buying / constructing / furnishing of my home as detailed above and shall not divert the same for any other purpose.',
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
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'I / We agree and assure that I / We shall submit the stage wise progress of construction activity. (Applicable in case of Construction / Additional Construction of house / apartment).',
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
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'I / We agree and assure to submit the required documents / information for consideration of my / our loan request and also during the currency of said loan as required by you from time to time.',
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
                          text: 'Applicant’s Details:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      shading: {
                        fill: 'D9E2F3',
                      },
                      columnSpan: 4,
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Applicant’s Signature',
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
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: '',
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
                          text: 'Applicant’s Name:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
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
                          text: data.app_data.a2_name,
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
                          text: 'Father / Husband Name:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
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
                          text: data.app_data.a2_fName,
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
                          text: 'Present Address:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_paddress,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_paddress,
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
                          text: 'Activity:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_activity,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_activity,
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
                          text: 'NRC No/s:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
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
                          text: data.app_data.a2_nrc,
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
                          text: 'Passport No/s, if any:',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a1_passport,
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: data.app_data.a2_passport,
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
                      columnSpan: 1,
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Photograph',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                    new TableCell({
                      children: [
                        new Paragraph({
                          text: 'Photograph',
                          heading: HeadingLevel.HEADING_1,
                        }),
                      ],
                    }),
                  ],
                }),
                // new TableRow({
                //   children: [
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           text: '',
                //           heading: HeadingLevel.HEADING_1,
                //         }),
                //       ],
                //       columnSpan: 1,
                //     }),
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           children: [
                //             new ImageRun({
                //               data: Buffer.from(blob),
                //               transformation: {
                //                 width: 200,
                //                 height: 100
                //               }
                //             })
                //             // new Paragraph({
                //             //   text: 'Photograph',
                //             //   heading: HeadingLevel.HEADING_1,
                //             // }),
                //           ]
                //         })
                //       ]
                //     }),
                //     new TableCell({
                //       children: [
                //         new Paragraph({
                //           text: 'Photograph',
                //           heading: HeadingLevel.HEADING_1,
                //         }),
                //       ],
                //     }),
                //   ],
                // }),
              ],
              indent: {
                size: -1000,
                type: WidthType.DXA,
              },
              width: { size: 122, type: WidthType.PERCENTAGE },
            }),
          ],
        },
      ],
    });

    return document;
  }
}
