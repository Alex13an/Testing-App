import React, { FC, useEffect, useState } from 'react'
import './adminPanel.scss'
import { Input, InputNumber, Button } from 'antd'
import { categoryApi } from '../../store/services/CategoryApi'
import CategorySelector from './../../components/categorySelector/CategorySelector'
import { IQuestion, IResult } from '../../models/appModels'
import { DeleteOutlined } from '@ant-design/icons'
import { testsApi } from '../../store/services/TestsApi'
import Loader from '../../components/loader/Loader'
const { TextArea } = Input

const AdminPanel: FC = () => {
  const [categoryId, setcategoryId] = useState<number | undefined>(1)
  const { isLoading: catLoading, data: categories } = categoryApi.useFetchAllCategoriesQuery(null)
  const [questions, setQuestions] = useState<IQuestion[]>([{ body: 'Первый вопрос', scale: 1 }])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [results, setResults] = useState<IResult[]>([])
  const [currentQuestion, setCurrentQuestion] = useState('')
  const [currentQuestionScale, setCurrentQestionScale] = useState(1)
  const [currentResult, setCurrentResult] = useState('')
  const [currentResultBreach, setCurrentResultBreach] = useState(1)
  const [createTest, {}] = testsApi.useCreateTestMutation()
  const [totalScore, setTotalScore] = useState(0)

  useEffect(() => {
    let total = 0
    questions.forEach(q => {
      total += 7 * q.scale
    })
    setTotalScore(total)
  }, [questions])

  const deleteQuestion = (body: string) => {
    setQuestions(prev => prev.filter(q => q.body !== body))
  }

  const deleteResult = (body: string) => {
    setResults(prev => prev.filter(q => q.body !== body))
  }

  const addQuestion = () => {
    if (questions.find(q => q.body === currentQuestion) || !currentQuestion) return
    setQuestions(prev => [
      ...prev,
      {
        body: currentQuestion,
        scale: currentQuestionScale,
      },
    ])
    setCurrentQuestion('')
    setCurrentQestionScale(1)
  }

  const addResult = () => {
    if (results.find(q => q.body === currentResult) || !currentResult) return
    setResults(prev => [
      ...prev,
      {
        body: currentResult,
        breach: currentResultBreach,
      },
    ])
    setCurrentResult('')
  }

  const testSubmit = async () => {
    if (!categoryId || !description || !title || !questions.length || !results.length) return
    try {
      const result = await createTest({
        categoryId: categoryId || 1,
        description,
        title,
        questions: [...questions],
        results: [...results],
      })
      if (result) {
        alert('Test created successfully!')
      }
    } catch (err) {
      alert(JSON.stringify(err))
    }
  }

  if (catLoading) return <Loader />

  return (
    <>
      <div className="test-create">
        <div className="test-create__main-data">
          <h2>Добавить тест</h2>
          <div className="test-create__test-description">
            <CategorySelector
              catId={categoryId}
              categories={categories || []}
              first={false}
              setCatId={setcategoryId}
              catName
            />
            <Input
              placeholder="Название теста"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <TextArea
              placeholder="Описание теста"
              showCount
              maxLength={1000}
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <h3>Добавить вопрос</h3>
          <div className="test-create__test-content">
            <h4>x</h4>
            <InputNumber
              min={1}
              max={10}
              defaultValue={1}
              value={currentQuestionScale}
              onChange={value => setCurrentQestionScale(value)}
            />
            <Input
              placeholder="Вопрос"
              value={currentQuestion}
              onChange={e => setCurrentQuestion(e.target.value)}
            />
            <Button type="primary" onClick={addQuestion}>
              Добавить
            </Button>
          </div>
          <br />
          <h3>Добавить результат</h3>
          <div className="test-create__test-content test-create__test-content_text">
            <div className="test-create__breach">
              <h4>Порог</h4>
              <InputNumber
                min={1}
                max={100}
                defaultValue={1}
                value={currentResultBreach}
                onChange={value => setCurrentResultBreach(value)}
              />
              <div className="test-create__breach-info">
                <div>Максимум баллов: {totalScore}</div>
                <div>Минимум баллов: {questions.length}</div>
              </div>
            </div>
            <TextArea
              placeholder="Результат"
              showCount
              maxLength={1000}
              value={currentResult}
              onChange={e => setCurrentResult(e.target.value)}
            />
            <Button type="primary" onClick={addResult}>
              Добавить
            </Button>
          </div>
        </div>
        <div className="test-create__content">
          <h2>Вопросы</h2>
          <div className="test-create__questions-pool">
            {questions.map(question => (
              <div key={question.body} className="test-create__question">
                {question.body} Scale: {question.scale}
                <button
                  className="test-create__delete-question"
                  onClick={() => deleteQuestion(question.body)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
          <h2>Результаты</h2>
          <div className="test-create__results-pool">
            {results.map(result => (
              <div key={result.body} className="test-create__question">
                {result.body} Breach: {result.breach}
                <button
                  className="test-create__delete-question"
                  onClick={() => deleteResult(result.body)}
                >
                  <DeleteOutlined />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className="add-test" onClick={testSubmit}>
        ДОБАВИТЬ ТЕСТ
      </button>
    </>
  )
}

export default AdminPanel
