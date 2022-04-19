import React, { FC, useState } from 'react'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { ISort, ISortType } from '../../models/fetchModels'

interface CategorySelectorProps {
  sort: { name: ISort; type: ISortType }
  setSort: (value: React.SetStateAction<{ name: ISort; type: ISortType }>) => void
}

const sortList: { name: ISort; type: ISortType; body: string }[] = [
  { name: 'id', type: 'DESC', body: 'Новые' },
  { name: 'id', type: 'ASC', body: 'Старые' },
  { name: 'title', type: 'ASC', body: 'А-Я' },
  { name: 'title', type: 'DESC', body: 'Я-А' },
]

const SortSelector: FC<CategorySelectorProps> = ({ sort, setSort }) => {
  const sortClick = ({ key }: { key: any }) => {
    const res = sortList.find(s => s.body === key)
    if (!res) return
    setSort({
      name: res.name,
      type: res.type,
    })
  }

  const sortMenu = (
    <Menu onClick={sortClick}>
      {sortList?.map(sor => (
        <Menu.Item
          key={sor.body}
          disabled={sor.name === sort.name && sor.type === sort.type ? true : undefined}
        >
          {sor.body}
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown overlay={sortMenu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        Сортировка
        <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default SortSelector
