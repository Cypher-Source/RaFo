import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { FeedCommentsPage } from "../../modals/feed-comments/feed-comments.page";
import { Category } from "src/app/schemas/users.schema";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  // maintaining category state
  categories: Array<Category> = [];

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    // load the category list into the holder
    this.categories = this.loadCategories();
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FeedCommentsPage,
    });
    return await modal.present();
  }

  // load the list of categories
  loadCategories(): Array<Category> {
    let categories: Array<Category> = [
      {
        isSelected: false,
        image: "../../../assets/B2-images/Agriculture.svg",
        name: "Agriculture",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Education.svg",
        name: "Education",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Science.svg",
        name: "Science",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Sports.svg",
        name: "Sports",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Technology.svg",
        name: "Technology",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Finance.svg",
        name: "Finance",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Politics.svg",
        name: "Politics",
      },
      {
        isSelected: false,
        image: "../../../assets/B2-images/Entertainment.svg",
        name: "Entertainment",
      },
    ];

    return categories;
  }
}
