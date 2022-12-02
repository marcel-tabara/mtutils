import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import { GenericFormSchemas } from '@mtutils/jsonschema-collection'
import React from 'react'

export const TypeSelector = ({
  data = [],
  onChange,
  handleTypeChange,
  setDataVisible,
  type,
}) => {
  const genericLabel = (label: string) => (
    <span style={{ fontFamily: 'Arial', fontSize: 12 }}>{label}</span>
  )

  const addNew = () => {
    onChange([
      {
        label: genericLabel(type),
        open: true,
        data: { title: type },
        type,
        schema:
          GenericFormSchemas[`rjsf_${type}`].definitions[
            type.replace(/^\w/, (c) => c.toUpperCase())
          ],
      },
      ...data,
    ])
    setDataVisible([])
  }
  const dataTypes = ['string', 'number', 'array', 'object']

  return (
    <>
      <FormControl variant="outlined">
        <InputLabel id="demo-simple-select-required-label">Type</InputLabel>
        <Select
          key="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={type}
          onChange={handleTypeChange}
          label="Select Type"
          style={{ width: '10rem' }}
        >
          <MenuItem value="" key="menu-ite-none">
            <em>None</em>
          </MenuItem>
          {dataTypes.map((e) => (
            <MenuItem value={e} key={`menu-item-${e}`}>
              {e}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <IconButton aria-label="close" onClick={addNew} disabled={!Boolean(type)}>
        <AddCircleOutlineIcon />
      </IconButton>
    </>
  )
}
