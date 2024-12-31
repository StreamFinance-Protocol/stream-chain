package types

import (
	"context"
	"net/http"
	"os"
	"strings"
)

// RequestHandlerImpl is the struct that implements the `RequestHandler` interface.
type RequestHandlerImpl struct {
	client *http.Client
}

// RequestHandler is an interface that handles making HTTP requests.
type RequestHandler interface {
	Get(ctx context.Context, url string) (*http.Response, error)
}

// NewRequestHandlerImpl creates a new RequestHandlerImpl. It manages making HTTP requests.
func NewRequestHandlerImpl(client *http.Client) *RequestHandlerImpl {
	return &RequestHandlerImpl{
		client: client,
	}
}

// Get wraps `http.Get` which makes an HTTP GET request to a URL and returns a response.
func (r *RequestHandlerImpl) Get(ctx context.Context, url string) (*http.Response, error) {
	if strings.Contains(url, "rost.pu.mba/api") {
		url = strings.Replace(url, "API_KEY", os.Getenv("ROST_KEY"), 1)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	if strings.Contains(url, "rost.pu.mba/api") {
		req.Header.Set("User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36")
	}

	return r.client.Do(req)
}
