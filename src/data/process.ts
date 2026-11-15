interface ProcessStep {
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { title: "პროექტის გაცნობა", description: "ვეცნობით ნახაზებს, ობიექტის პირობებსა და მშენებლობის გრაფიკს." },
  { title: "კომერციული შეთავაზება", description: "ვათანხმებთ სამუშაოების მოცულობას, მასალების მოწოდებასა და ეტაპებს." },
  { title: "მონტაჟი", description: "სამუშაოებს ვასრულებთ ობიექტის გუნდთან კოორდინაციით." },
  { title: "შემოწმება და ჩაბარება", description: "ვამოწმებთ შეთანხმებულ სისტემებს და გადავცემთ შესაბამის დოკუმენტაციას." },
];
