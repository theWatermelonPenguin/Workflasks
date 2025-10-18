import {getInstalledApps} from 'get-installed-apps'
import {knownAppLocations} from './consts.js'

async function searchApps() {
  const allinstalledAppsData = await getInstalledApps()
  const installedApps = [...new Set(allinstalledAppsData.map(app => app.DisplayName))];

  const matches = []

  for(const app of installedApps) {
    for(const key of Object.keys(knownAppLocations)) {
      if(app.includes(key)) {
        matches.push(app)
      }
    }
  }

  return matches
}

export default searchApps