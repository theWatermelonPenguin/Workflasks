import {getInstalledApps} from 'get-installed-apps'

async function searchApps() {
  const installedApps = await getInstalledApps()
  return installedApps.map(app => app.DisplayName)
}

export default searchApps