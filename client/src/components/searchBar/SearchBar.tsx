import React, { FC, useCallback, useRef, useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import './searchBar.scss'
import { testsApi } from '../../store/services/TestsApi'
import { Link } from 'react-router-dom'

const SearchBar: FC = () => {
  const [searchValue, setSearchValue] = useState('')
  const timer = useRef(null)
  const [getSearchedTests, { isLoading, data: tests }] = testsApi.useLazySearchTestsQuery()

  const getTests = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setSearchValue(val)
    if (val.length < 3) return
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      getSearchedTests({ searchValue: val, limit: 5 })
    }, 500)
  }, [])

  return (
    <div className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Найти тест..."
        value={searchValue}
        onChange={e => getTests(e)}
      />
      <button className="search__submit">
        <SearchOutlined />
      </button>
      {tests && tests.length > 0 && searchValue.length > 2 && (
        <div className="search__results">
          {isLoading ? (
            <div className="search__result">Loading...</div>
          ) : (
            tests?.map(test => (
              <Link key={test.id} to={`/${test.id}`} onClick={() => setSearchValue('')}>
                <div className="search__result">{test.title}</div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

export default SearchBar
