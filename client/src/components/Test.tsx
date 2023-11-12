import { base64encode, generateRandomString, sha256 } from "../utils/utils"

const Test = () => {
  const redirectToAuthCodeFlow = (clientId: string) => {}
  const getAccessToken = () => {}
  const fn = async () => {
    const codeVerifier = generateRandomString(64)
    const hashed = await sha256(codeVerifier)
    const codeChallenge = base64encode(hashed)
    console.log({ codeVerifier, hashed, codeChallenge })
  }
  fn()
  return <div style={{ color: "black" }}>Test</div>
}

export default Test
