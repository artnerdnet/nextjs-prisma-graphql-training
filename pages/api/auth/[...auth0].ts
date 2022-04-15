import { handleAuth } from '@auth0/nextjs-auth0'

export default handleAuth()

const fetch = require('node-fetch')

exports.onExecutePostLogin = async (event, api) => {
  // get the hook secret from the event object
  const SECRET = event.secrets.AUTH0_HOOK_SECRET
  
  // add localUserCreated to the user's metadata to know if they logged in before and they exist in the DB
  if (event.user.app_metadata.localUserCreated) {
    return
  }

  // this is the user mail registered on Auth0
  const email = event.user.email

  // send a post to my endpoint passing the email+secret
  const request = await fetch(`http://5b11-89-128-233-240.ngrok.io/api/auth/hook`, { // TODO change the URL if in prod
    method: 'post',
    body: JSON.stringify({ email, secret: SECRET }),
    headers: { 'Content-Type': 'application/json' },
  })
  const response = await request.json()

  // add localUserCreated to the metadata
  // the api.user.setAppMetadata function allows you to add additional properties to a user's profile
  api.user.setAppMetadata('localUserCreated', true)
}