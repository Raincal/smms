import React from 'react'
import { Form, Input } from 'antd'

const Search = Input.Search

const Filter = ({
  onFilterChange,
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const handleSubmit = () => {
    const fields = getFieldsValue()
    onFilterChange(fields)
  }

  return (
    <div>
      {getFieldDecorator('filename', { initialValue: '' })(
        <Search
          placeholder="Search Filename"
          onSearch={handleSubmit}
        />)}
    </div>
  )
}

export default Form.create()(Filter)
