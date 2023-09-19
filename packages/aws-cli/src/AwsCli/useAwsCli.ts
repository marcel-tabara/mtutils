import { useState } from 'react'
import * as data from './data'
import { AwsCliBaseProps, iHandleValueChange, iSelectionData } from './types'
import { allServiceNames } from './utils/constants'

export const useAwsCli = () => {
  const [selectionData, setObj] = useState<iSelectionData | undefined>()
  const [selectedService, setSelectedService] = useState<AwsCliBaseProps>()

  const allServices: AwsCliBaseProps[] = allServiceNames.map(
    (service) => data[service],
  )
  const allNames: string[] = allServices.map((e) => e.service_name)
  const allCommands: string[] = (selectedService?.service_commands ?? []).map(
    (e) => e.command_name,
  )
  const allCommandOptions = () => {
    return (selectedService?.service_commands ?? [])
      .find((e) => e.command_name === selectionData.command_name)
      ?.command_options.map((e) => {
        const clean = e.replace('[', '').replace(']', '')
        return clean.includes('|') ? clean.split('|') : clean
      })
  }

  const getSelected = (service_name: string): AwsCliBaseProps => {
    return allServices.find((e) => e.service_name === service_name)
  }

  const handleServiceChange = (event, value: string) => {
    setSelectedService(getSelected(value))
    setObj({
      ...selectionData,
      service_name: value,
    })
  }

  const handlCommandChange = (event, value: string) => {
    setObj({
      ...selectionData,
      command_name: value,
      command_options: [],
    })
  }

  const addCommandOptionToState = (
    newCommandOptions,
    command_option,
    value,
  ) => {
    newCommandOptions.push({
      command_options_name: command_option,
      command_options_value: value,
    })
  }

  const handleValueChange = ({ event, command_option }: iHandleValueChange) => {
    const existing_command_option = (selectionData?.command_options ?? []).some(
      (e) => e.command_options_name === command_option,
    )
    let newCommandOptions = [...selectionData.command_options]
    if (!existing_command_option) {
      addCommandOptionToState(
        newCommandOptions,
        command_option,
        event.target.value,
      )
    } else {
      newCommandOptions = (selectionData?.command_options || []).filter((e) => {
        return e.command_options_name !== command_option
      })
      addCommandOptionToState(
        newCommandOptions,
        command_option,
        event.target.value,
      )
    }

    setObj({
      ...selectionData,
      command_options: newCommandOptions,
    })
  }

  const getExamples = () =>
    selectedService?.service_commands.find(
      (e) => e.command_name === selectionData?.command_name,
    )?.command_examples

  const generateCode = () => {
    const getCommandOptions = () => {
      return (selectionData?.command_options || []).map((e) => {
        return (
          e.command_options_name.replace('<value>', '') +
          `${e.command_options_value} `
        )
      })
    }
    return `aws ${selectionData?.service_name} ${
      selectionData?.command_name
    } ${getCommandOptions()}`
  }

  const getCleanCode = () => {
    const code = generateCode()
      .replace(/,/g, '')
      .replace(/undefined/g, '')
      .trim()

    return code.length > 3 ? code : null
  }
  const cleanCode = getCleanCode()

  return {
    cleanCode,
    getExamples,
    handleServiceChange,
    handlCommandChange,
    handleValueChange,
    allCommandOptions,
    allCommands,
    allNames,
    selectedService,
    selectionData,
  }
}
