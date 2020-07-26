import { Component, OnInit, Input } from "@angular/core";
import { FeedCommentsPage } from "../../modals/feed-comments/feed-comments.page";
import {
  Category,
  UserStatus,
  UserDetails,
} from "src/app/schemas/users.schema";
import { AuthUtilsService } from "src/app/services/AuthUtils/auth-utils.service";
import { Router, ActivatedRoute } from "@angular/router";
import { ResponseViewService } from "src/app/services/ResponseViews/response-view.service";
import { ModalController } from "@ionic/angular";

@Component({
  selector: "app-category",
  templateUrl: "./category.page.html",
  styleUrls: ["./category.page.scss"],
})
export class CategoryPage implements OnInit {
  @Input() category: Array<String> = [];
  @Input() fromPage: string = null;

  // maintaining category state
  categories: Array<Category> = [];

  // selected categories
  selectedCategories: Array<String> = [];

  // user details
  userDetails: UserDetails;

  constructor(
    private authUtils: AuthUtilsService,
    private responseViews: ResponseViewService,
    private router: Router,
    private route: ActivatedRoute,
    private modalController: ModalController
  ) {
    this.route.queryParams.subscribe((params) => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.userDetails = this.router.getCurrentNavigation().extras.state.userDetails;
      }
    });
  }

  ngOnInit() {
    // load the category list into the holder
    this.categories = this.loadCategories();
  }

  // update the category in the database
  async updateCategory() {
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();
    try {
      const result = await this.authUtils.setCurrentUserCategory(
        this.selectedCategories
      );

      if (result.status) {
        (await loading).dismiss();
        this.responseViews.presentToast("Prefered categories updated!");
        if (this.fromPage !== null) {
          this.modalController.dismiss();
        } else {
          this.router.navigate(["/tabs/tab1"]);
        }
      } else {
        (await loading).dismiss();
        this.responseViews.presentToast("User not logged in!");
        if (this.fromPage !== null) {
          this.modalController.dismiss();
        }
      }
    } catch (error) {
      (await loading).dismiss();
      this.responseViews.presentToast(
        "Some error has occured, please check your internet connection"
      );
      if (this.fromPage !== null) {
        this.modalController.dismiss();
      }
    }
  }

  async createAccount() {
    this.userDetails["category"] = this.selectedCategories;
    const loading = this.responseViews.getLoadingScreen();
    (await loading).present();
    try {
      const result = await this.authUtils.createUser(this.userDetails);
      if (result.status) {
        this.responseViews.presentToast("Account created!");
        (await loading).dismiss();
      } else {
        this.responseViews.presentToast(
          "Some error has occured, please try again"
        );
        (await loading).dismiss();
      }
    } catch (e) {
      this.responseViews.presentToast(
        "Some error has occured, please try again"
      );
      (await loading).dismiss();
    }
  }

  // category click handler
  categoryClicked(i: number) {
    this.categories[i].isSelected = !this.categories[i].isSelected;

    // empty the selected categories
    this.selectedCategories = [];
    this.categories.forEach((category) => {
      if (category.isSelected) {
        this.selectedCategories.push(category.name);
      }
    });
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

    categories = categories.map((element) => {
      if (this.category.includes(element.name)) {
        element.isSelected = true;
      }
      return element;
    });

    return categories;
  }

  // close the modal view
  closeModal() {
    this.modalController.dismiss();
  }
}
