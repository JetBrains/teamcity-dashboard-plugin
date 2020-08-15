// @flow strict
import React from 'react'
import type { ChangeId } from '../../features/changes/changes.slice'
import { useOpenThisWidgetChangeDetailsPopup } from './TopLevelChangeDetailsPopup/TopLevelChangeDetailsPopup.hooks'
import FilesIcon from '../../resources/svg/files.svg'
import Icon, { FileIcon } from '@jetbrains/ring-ui/components/icon'
import Button from '@jetbrains/ring-ui/components/button/button'

interface Properties {
	targetChangeId: ChangeId;
}

const OpenChangeDetailsPopupButton = ({ targetChangeId }: Properties) => {
	const openPopup = useOpenThisWidgetChangeDetailsPopup(targetChangeId)
	return <Button icon={FilesIcon} onClick={openPopup} />
}

export default OpenChangeDetailsPopupButton
