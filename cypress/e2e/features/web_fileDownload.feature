@full @web
Feature: web_fileDownload
    # Scenario: Descarga y validacion archivos de imagen
    #     Given I proceed to download the image file from the url <fileUrl>
    #     Examples:
    #         | fileUrl                                                      |
    #         | 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg' |


    # Scenario: Descarga y validacion de archivos pdf
    #     Given I proceed to download the pdf file from the url <fileUrl>
    #     Examples:
    #         | fileUrl                                            |
    #         | 'http://www.africau.edu/images/default/sample.pdf' |


    Scenario: Descarga y validacion de archivos <fileType>
        Given I proceed to download a pdf file from url <fileUrl> whith teh filename <filename>
        Then the file <filename> exists and contains the text <text>
        Examples:
            | fileType | fileUrl                                                                     | filename         | text                                      |
            | .pdf     | 'http://www.africau.edu/images/default/sample.pdf'                          | 'pdfExample.pdf' | 'This is a small demonstration .pdf file' |
            | .jpg     | 'https://upload.wikimedia.org/wikipedia/en/a/a9/Example.jpg'                | 'jpgExample.jpg' | 'This is an example image'                |
            | .png     | 'https://commons.wikimedia.org/static/images/project-logos/commonswiki.png' | 'pngExample.png' | 'WIKIMEDIA'                               |

