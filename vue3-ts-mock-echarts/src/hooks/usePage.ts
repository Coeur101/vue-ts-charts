const usePage = (getPage: (pager: number) => void) => {
  const pageSize = ref<number>(10)
  const currentPage = ref<number>(1)
  const total = ref<number>(0)
  /**
   * 当前页条数发生改变时
   */
  const handleSizeChange = () => {
    currentPage.value = 1
    getPage(currentPage.value)
  }
  /**
   * 当前页码发生改变时
   */
  const handleCurrentChange = () => {
    getPage(currentPage.value)
  }
  return {
    pageSize,
    total,
    currentPage,
    handleSizeChange,
    handleCurrentChange,
  }
}
export default usePage
