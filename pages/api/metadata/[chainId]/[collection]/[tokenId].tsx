export default function handler(req: any, res: any) {

  const { chainId, collection, tokenId } = req.query;

  // make database connection and fetch the metadata
  // hard coded for now!

  const metadata = {
    'image': 'https//magicprivatecollector.com/img/ramen.jpg',
    'name': 'The Ultimate Tonkotsu Ramen Video [*SECRET*]',
    'description': 'This is a very private video of a bowl of tonkotsu ramen filmed undercover in a secret location in New York City. You can only watch this video when you are the owner of this NFT and signed in with your wallet on our website https://magicprivatecollector.com',
    'external_url': 'https//magicprivatecollector.com',
    'private_content':
    {
      'url': 'https//magicprivatecollector.com/content/ramen.mov',
      'name': 'Everything you ever wanted to see in a Tonkotsu Ramen and MORE!',
      'description': 'Look at this beautiful bowl of soup in all it\'s glory. Aren\'t you getting hungry and excited? Call up your local ramen supplier now and get your fix!'
    },
    tokenId,
    collection,
    chainId
  };

  res.setHeader('Content-Type', 'application/json');
  res.send(metadata);

}
