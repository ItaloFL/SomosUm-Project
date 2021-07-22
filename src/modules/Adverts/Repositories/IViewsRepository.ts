interface IViewsRepository{
  countView(ad_id: string, user_id: string): Promise<void> 
}

export { IViewsRepository }