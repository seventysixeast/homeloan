angular.module('homeloan', [])
    .controller('docxController', function($scope) {
        console.log('hitignng')
        // Add your helper function to the scope
        $scope.generateDocx = function() {
            // Your helper function logic
            const doc = new docx.Document({
                sections: [{
                  properties: {},
                  children: [
                    new docx.Paragraph({
                      children: [
                        new docx.TextRun("Hello World"),
                        new docx.TextRun({
                          text: "Foo Bar",
                          bold: true,
                        }),
                        new docx.TextRun({
                          text: "\tGithub is the best",
                          bold: true,
                        }),
                      ],
                    }),
                  ],
                }]
            });
      
            docx.Packer.toBlob(doc).then(blob => {
                console.log(blob);
                saveAs(blob, "example.docx");
                console.log("Document created successfully");
            });
        };
    });