import category1 from '../assets/images/categories/category-1.svg'
import category2 from '../assets/images/categories/category-2.svg'
import category3 from '../assets/images/categories/category-3.svg'
import category4 from '../assets/images/categories/category-4.svg'
import category5 from '../assets/images/categories/category-5.svg'

const catImg = [category1, category2, category3, category4, category5]

const getCategoryImage = (categoryId: number) => {
  return categoryId > catImg.length ? catImg[0] : catImg[categoryId - 1]
}

export default getCategoryImage
