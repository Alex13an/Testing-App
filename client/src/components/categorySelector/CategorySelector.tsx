import React, { FC } from 'react'
import { ICategory } from '../../models/appModels'
import { Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

interface CategorySelectorProps {
  categories: ICategory[]
  first: boolean
  catId: number | undefined
  setCatId: (value: React.SetStateAction<number | undefined>) => void
  catName: boolean
}

const CategorySelector: FC<CategorySelectorProps> = ({
  categories,
  first,
  catId,
  setCatId,
  catName,
}) => {
  const catClick = ({ key }: { key: any }) => {
    if (key === 'first') return setCatId(undefined)
    setCatId(key)
  }

  const getCategory = () => {
    let name = categories.find(cat => cat.id == catId)?.name
    if (!name) name = 'Все тесты'
    return name
  }

  const catMenu = (
    <Menu onClick={catClick}>
      {first && (
        <Menu.Item key={'first'} disabled={catId ? undefined : true}>
          Все тесты
        </Menu.Item>
      )}
      {categories?.map(cat => (
        <Menu.Item key={cat.id} disabled={cat.id == catId ? true : undefined}>
          {cat.name}
        </Menu.Item>
      ))}
    </Menu>
  )
  return (
    <Dropdown overlay={catMenu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
        {catName ? getCategory() : 'Категория'}
        <DownOutlined />
      </a>
    </Dropdown>
  )
}

export default CategorySelector
