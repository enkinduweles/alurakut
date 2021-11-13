import nextConnect from 'next-connect';

export default nextConnect({
  onError: (error, request, response) => {
    console.log(error);
    let responseError = { status: 0, message: '' };

    if (error.response) {
      responseError.status = error.response.status;
    } else {
      responseError.status = error.status;
    }

    switch (responseError.status) {
      case 422:
        responseError.message = "We couldn't process your request!";
        break;
      case 404:
        responseError.message = 'Resource not found!';
        break;
      case 403:
        responseError.message = 'Forbidden operation!';
        break;
      case 401:
        responseError.message = 'You must have a valid credential';
        break;
      case 400:
        responseError.message = error.message;
        break;
      default:
        responseError.message = 'Sorry, something went wrong!';
        break;
    }
    response.status(responseError.status).json(responseError.message);
  },
  onNoMatch: (request, response) => {
    response.status(405).end(`Method ${request.method} not allowed`);
  },
});
