@full @API
Feature: Ejemplo API testing
    Scenario: Búsqueda de herramienta en json de respuesta
        Given As a user I want to execute a GET for all "tools"
        Then Verify '@get_tools_data' response status code is 200
        And Verify response details for tool "PEX Clamp Tool"

    Scenario Outline: Ejemplo de API testing con Scenario Outline
        Given As a user I want to execute a GET for all "tools"
        Then Verify '@get_tools_data' response status code is 200
        And Verify response details for tool <ToolName>
        Examples:
            | ToolName                              |
            | "PEX Clamp Tool"                      |
            | "GENMAX 3200 Watt Inverter Generator" |
            | "20V Max Drill & Home Tool Kit"       |

    Scenario Outline: Búsqueda de lista de herramientas
        Given As a user I want to execute a GET for <numberOfItems> <ToolCategory>
        Then Verify '@get_tools_data' response status code is <statusCode>
        And Verify the number of tools obtained equals <numberOfItems>
        Examples:
            | ToolCategory | numberOfItems | statusCode |
            | "ladders"    | 3             | 200        |
            | "plumbing"   | 3             | 200        |

    Scenario: Ejemplo comando post con body json
        Given As the user <customerName> I want to create an order for <toolCode>
        Then Verify response status code is 201
        And Verify order status is 'created'
        Examples:
            | customerName     | toolCode |
            | "Marcelo Torres" | "4643"   |

    Scenario: Registro de usuario y escritura de fichero
        Given I proceed register a new client for <clientName> <clientEmail>
        Then Verify response status code is 201
        And Write response in a response file named <fileName>
        Examples:
            | clientName  | clientEmail                  | fileName        |
            | "testUser35" | "testUserMail35@example.com" | "tokenResponse" |

    Scenario: Creacion de orden a partir de fichero
        Given The file with the accessToken exist <fileName>
        Then Create an order with clientName <clientName> and toolId <toolId> with the token in file <fileName>
        Then Verify response status code is 201
        And Verify order status is 'created'
        Examples:
            | clientName  | toolId | fileName        |
            | "testUs15" | "4643"     | "tokenResponse" |