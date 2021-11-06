import nextConnect from 'next-connect';
import { validateToken } from './auth';

export default nextConnect({
  onError: (error, request, response) => {
    console.log(error);
    let message = null;
    switch (error.statusCode) {
      case 422:
        message = "We couldn't process your request!";
        break;
      case 404:
        message = 'Resource not found!';
        break;
      case 403:
        message = 'Forbidden operation!';
        break;
      case 401:
        message = 'You must have a valid credential';
        break;
      case 400:
        message = error.message;
        break;
      default:
        message = 'Sorry, something went wrong!';
        break;
    }
    response.status(error.statusCode).json({ message });
  },
  onNoMatch: (request, response) => {
    response.status(405).end(`Method ${request.method} not allowed`);
  },
});
