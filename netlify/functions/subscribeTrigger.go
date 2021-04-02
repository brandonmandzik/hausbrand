package main

import (
	"fmt"
	"net/http"
	"os"
	"strings"

	"github.com/aws/aws-lambda-go/events"
	"github.com/aws/aws-lambda-go/lambda"
)

func handler(request events.APIGatewayProxyRequest) (*events.APIGatewayProxyResponse, error) {
	url := "https://api.sendinblue.com/v3/contacts"
	userEmail := request.QueryStringParameters["email"]
	MAIL_KEY := os.Getenv("MAIL_KEY")

	// get client input context
	plString := fmt.Sprintf("{\"listIds\":[3],\"updateEnabled\":true,\"email\":\"%s\"}", userEmail)
	payload := strings.NewReader(plString)

	req, _ := http.NewRequest("POST", url, payload)

	req.Header.Add("Accept", "application/json")
	req.Header.Add("Content-Type", "application/json")
	req.Header.Add("api-key", MAIL_KEY)

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	var returnCode int

	if res.StatusCode == 200 || res.StatusCode == 204 {
		returnCode = 200
	} else {
		returnCode = 400

	}

	// Lambda return
	return &events.APIGatewayProxyResponse{
		StatusCode: returnCode,
		Body:       "done.",
	}, nil

}

func main() {
	// Make the handler available for Remote Procedure Call by AWS Lambda
	lambda.Start(handler)
}
