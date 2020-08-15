// @flow strict
import React from 'react'
import type { BuildTypeId } from '../../hooks/TC/schemata'
import { useBuildTypeBuilds } from '../../features/builds/builds.hooks'

interface Properties {
	buildTypeId: BuildTypeId;
}

const buildTypeId = 'ManyProjects_DeeperProject_1PassingTest1FailingTest_Build1passing1failingWithBranches'
const branchName = 'refs/heads/master'

const BuildTypeBuilds = () => {
	const builds = useBuildTypeBuilds(buildTypeId, branchName)
	return <div></div>
}

export default BuildTypeBuilds
