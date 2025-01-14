// @flow
import type { ClusterType, VnicProfileType } from '_/ovirtapi/types'

function checkUserPermit (permit: string | Array<string>, permits: Array<string>): boolean {
  if (Array.isArray(permit)) {
    for (const p of permit) {
      if (!permits.includes(p)) {
        return false
      }
    }
    return true
  } else {
    return permits.includes(permit)
  }
}

export function canUserChangeCd (permits: Array<string>): boolean {
  return checkUserPermit('change_vm_cd', permits)
}

export function canUserUseCluster (permits: Array<string>): boolean {
  return checkUserPermit('create_vm', permits)
}

export function canUserUseTemplate (permits: Array<string>): boolean {
  return checkUserPermit('create_vm', permits)
}

export function canUserEditVm (permits: Array<string>): boolean {
  return checkUserPermit('edit_vm_properties', permits)
}

export function canUserUseVnicProfile (permits: Array<string>): boolean {
  return checkUserPermit('configure_vm_network', permits)
}

export function canUserManipulateSnapshots (permits: Array<string>): boolean {
  return checkUserPermit('manipulate_vm_snapshots', permits)
}

export function canUserUseStorageDomain (permits: Array<string>): boolean {
  return checkUserPermit(['create_disk', 'attach_disk_profile'], permits)
}

export function canUserEditVmStorage (permits: Array<string>): boolean {
  return checkUserPermit('configure_vm_storage', permits)
}

export function canUserEditDisk (permits: Array<string>): boolean {
  return checkUserPermit('edit_disk_properties', permits)
}

/*
 * Return if any of the given clusters are available for use by the user (as defined
 * by `canUserUseCluster` above)
 */
export function canUserUseAnyClusters (clusters: Array<ClusterType>): boolean {
  return clusters.find(cluster => cluster.get('canUserUseCluster')) !== undefined
}

/*
 * Return if any of the given vNIC Profiles are available for use by the user (as defined
 * by `canUserUseVnicProfile` above)
 */
export function canUserUseAnyVnicProfile (vnicProfiles: Array<VnicProfileType>, dataCenterId: string): boolean {
  return vnicProfiles.find(vnicProfile =>
    vnicProfile.get('canUserUseProfile') && vnicProfile.getIn(['network', 'dataCenterId']) === dataCenterId
  ) !== undefined
}
