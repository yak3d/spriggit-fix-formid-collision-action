import { exec } from 'child_process'
import { error } from 'console'
import * as fs from 'fs'

export const dedupeFormIds = async (
  spriggitCliPath: string,
  pluginPath: string
) => {
  console.log(
    `Deduping form ids in the serialized plugin data at ${pluginPath}`
  )
  if (!fs.existsSync(spriggitCliPath)) {
    console.error(`spriggit was not found at ${spriggitCliPath}`)
    throw error(`spriggit was not found at ${spriggitCliPath}`)
  }

  exec(
    spriggitCliPath + ` formid-collision -p ${pluginPath}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(
          `There was an error running ${spriggitCliPath}, see stderr below`
        )
        console.log(stdout)
        console.error(`stderr: ${stderr}`)

        throw error
      }

      console.log(stdout)
      console.error(stderr)
    }
  )
}
