import { Repository, getRepository } from "typeorm";
import { View } from "../entities/Views"
import { IViewsRepository } from "../../../Repositories/IViewsRepository";

class ViewsRepository implements IViewsRepository {
  private repository: Repository<View>

  constructor() {
    this.repository = getRepository(View);
  }
  async countView(ad_id: string, user_id: string): Promise<void> {  
    const view = this.repository.create({
      ad_id,
      user_id
    })
  
    await this.repository.save(view);

    return;
  }
}

export { ViewsRepository }
