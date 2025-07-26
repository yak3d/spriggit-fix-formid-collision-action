import * as core from '@actions/core'
import { downloadSpriggit } from '@yak3d/spriggit-action-lib'
import { pluginPathInput, spriggitVersionInput } from './inputConstants.js'
import { dedupeFormIds } from './spriggit.js'

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const spriggitVersion = core.getInput(spriggitVersionInput)
    const pluginPath = core.getInput(pluginPathInput)

    await downloadSpriggit(spriggitVersion)
    await dedupeFormIds('./spriggit/Spriggit.CLI', pluginPath)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}
