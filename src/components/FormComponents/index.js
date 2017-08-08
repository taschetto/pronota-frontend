import React from 'react'
import AutoComplete from 'material-ui/AutoComplete'
import SelectField from 'material-ui/SelectField'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

export const TextForm = props => (
  <TextField
    hintText={props.label}
    type={props.type ? props.type : "text"}
    fullWidth={true}
    floatingLabelText={props.label}
    errorText={props.meta.touched && props.meta.error}
    onChange={(v) => props.input.onChange(v)}
    value={props.input.value} />
);

export const AutoCompleteForm = props => {
  const key = props.dataSourceConfig['text']
  const selectedItem = props.dataSource[props.input.value - 1]
  const searchText = selectedItem ? selectedItem[key] : ''

  return (
    <AutoComplete
      fullWidth={true}
      floatingLabelText={props.label}
      errorText={props.touched && props.error}
      maxSearchResults={6}
      onNewRequest={(e, i, v) => props.input.onChange(++i)}
      filter={AutoComplete.caseInsensitiveFilter}
      dataSourceConfig={props.dataSourceConfig}
      searchText={searchText}
      dataSource={props.dataSource} />
  )
}

export const SelectForm = props => (
  <SelectField
    fullWidth={true}
    floatingLabelText={props.label}
    errorText={props.touched && props.error}
    onChange={(event, index, value) => props.input.onChange(value)}
    children={props.children}
    value={props.input.value} />
);

export const CheckBoxForm = props => (
  <Checkbox label={props.label} checked={props.input.value ? true : false}
    onCheck={props.input.onChange} />
);
