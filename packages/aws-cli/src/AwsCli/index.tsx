import FileCopyIcon from '@material-ui/icons/FileCopy'
import Autocomplete from '@mui/material/Autocomplete'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import TextField from '@mui/material/TextField'
import React from 'react'
import './styles.css'
import { AwsCliProps } from './types'
import { useAwsCli } from './useAwsCli'

const AwsCli = ({ onChange, type }: AwsCliProps): JSX.Element => {
  const {
    cleanCode,
    getExamples,
    handlCommandChange,
    handleValueChange,
    allCommandOptions,
    allCommands,
    handleServiceChange,
    allNames,
    selectedService,
    selectionData,
  } = useAwsCli()
  return (
    <div className="container">
      <div>
        <Autocomplete
          autoHighlight
          disablePortal
          id="combo-box-demo"
          options={allNames}
          sx={{ width: 300 }}
          onChange={handleServiceChange}
          renderInput={(params) => <TextField {...params} label="Services" />}
        />
      </div>
      {selectedService && (
        <div>
          <Autocomplete
            autoHighlight
            disablePortal
            id="combo-box-demo"
            options={allCommands}
            sx={{ width: 300 }}
            onChange={handlCommandChange}
            renderInput={(params) => <TextField {...params} label="Commands" />}
          />
        </div>
      )}
      <div>{selectedService?.service_name}</div>
      <div
        dangerouslySetInnerHTML={{
          __html: selectedService?.service_description,
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: getExamples() }} />
      <div>
        {(allCommandOptions() || []).flat().map((command_option) => (
          <div key={command_option} className="padTop">
            <div>{command_option}</div>
            <div>
              <TextField
                id="outlined-name"
                label="Value"
                value={selectionData?.command_options?.[command_option]}
                onChange={(event) =>
                  handleValueChange({ event, command_option })
                }
              />
            </div>
          </div>
        ))}
      </div>
      {cleanCode && (
        <div>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {cleanCode}
              <span>
                <FileCopyIcon
                  fontSize="small"
                  onClick={() => navigator.clipboard.writeText(cleanCode)}
                />
              </span>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

export { AwsCli }
