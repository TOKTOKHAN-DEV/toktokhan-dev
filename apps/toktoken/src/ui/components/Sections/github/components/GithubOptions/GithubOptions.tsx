import React from 'react'

import { UseFormReturn } from 'react-hook-form'

import { Accordion } from '../../../../@headless/Accodion'
import { FormDataType } from '../../hooks/useGithubForm'
import GithubOptionFormView from './components/GithubOptionFormView'

interface GithubOptionsProps {
  formData: UseFormReturn<FormDataType>
}

const GithubOptions = ({ formData }: GithubOptionsProps) => {
  return (
    <Accordion allowMultiple hasDivider>
      <Accordion.Item className={'px-[16px] py-0'}>
        <Accordion.Button className={'pt-[10px] pb-[11px]'}>
          Options
        </Accordion.Button>
        <Accordion.Panels className={'py-[8px]'}>
          <GithubOptionFormView formData={formData} />
        </Accordion.Panels>
      </Accordion.Item>
    </Accordion>
  )
}

export default GithubOptions
