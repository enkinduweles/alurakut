import nextConnect from 'next-connect';

export default nextConnect({
  onError: (error, request, response) => {
    let message = null;
    switch (error.statusCode) {
      case 422:
        message = "We couldn't process your request!";
        break;
      case 404:
        message = 'Resource not found!';
        break;
      default:
        message = 'Sorry, something went wrong!';
        break;
    }
    response.status(error.statusCode).json(message);
  },
  onNoMatch: (request, response) => {
    response.status(405).end(`Method ${request.method} not allowed`);
  },
});
