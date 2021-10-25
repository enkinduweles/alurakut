import nextConnect from 'next-connect';

export default nextConnect({
  onError: (error, request, response) => {
    response.status(error.status).json({ error: error.message });
  },
  onNoMatch: (request, response) => {
    response.status(405).end(`Method ${request.method} not allowed`);
  },
});
